import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ThemeLayout from "./ThemeLayout";
import { cookies, headers } from 'next/headers';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teste App",
  description: "Teste app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // read cookie (prefer server API, fallback to document.cookie if running in browser)
  let theme: string | undefined;
  let sidebarMinimized: string | undefined;
  try {
    const cookieStore = await cookies();
    if (cookieStore && typeof (cookieStore as any).get === 'function') {
      theme = (cookieStore as any).get('theme')?.value;
      sidebarMinimized = (cookieStore as any).get('sidebar_minimized')?.value;
    }
  } catch (e) {
    // ignore
  }
  // fallback: read Cookie header on server
  if (!theme) {
    try {
      const _headers = await headers();
      const cookieHeader = _headers.get('cookie');
      if (cookieHeader) {
        const m = cookieHeader.match(/(?:^|; )theme=([^;]+)/);
        theme = m ? decodeURIComponent(m[1]) : undefined;
        const sm = cookieHeader.match(/(?:^|; )sidebar_minimized=([^;]+)/);
        sidebarMinimized = sm ? decodeURIComponent(sm[1]) : undefined;
      }
    } catch (e) {}
  }
  // do not access `document` in server component; prefer server cookies/headers
  const htmlClass = theme === 'dark' ? 'dark' : '';

  return (
    <html lang="pt-BR" className={htmlClass}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
            try{
              var stored = null;
              try{ stored = localStorage.getItem('theme'); }catch(e){}
              if(!stored){
                var m = document.cookie.match('(?:^|; )theme=([^;]+)');
                stored = m ? decodeURIComponent(m[1]) : null;
              }
              var serverDark = ${JSON.stringify(theme === 'dark')};
              if(stored === 'dark') document.documentElement.classList.add('dark');
              else if(stored === 'light') document.documentElement.classList.remove('dark');
              else if(serverDark) document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
              // Dev: remove attributes injected by extensions/overlay that break hydration
              try{
                var cleanAttr = function(el){
                  if(!el || !el.attributes) return;
                  var removeList = [];
                  for(var j=0;j<el.attributes.length;j++){
                    var an = el.attributes[j].name;
                    if(/^bis_/.test(an) || /^__processed_/.test(an) || an === 'bis_register' || an === 'bis_skin_checked') removeList.push(an);
                  }
                  for(var k=0;k<removeList.length;k++){ el.removeAttribute(removeList[k]); }
                };
                var all = document.querySelectorAll('*');
                for(var i=0;i<all.length;i++) cleanAttr(all[i]);
                // Also observe mutations during HMR and clean newly added/changed nodes
                var mo = new MutationObserver(function(records){
                  for(var r=0;r<records.length;r++){
                    var rec = records[r];
                    if(rec.type === 'attributes' && rec.target) cleanAttr(rec.target);
                    if(rec.addedNodes && rec.addedNodes.length){
                      for(var n=0;n<rec.addedNodes.length;n++){
                        cleanAttr(rec.addedNodes[n]);
                        if(rec.addedNodes[n].querySelectorAll){
                          var nested = rec.addedNodes[n].querySelectorAll('*');
                          for(var m=0;m<nested.length;m++) cleanAttr(nested[m]);
                        }
                      }
                    }
                  }
                });
                mo.observe(document, { attributes: true, subtree: true, childList: true });
                // stop observing after a short period to avoid overhead
                setTimeout(function(){ try{ mo.disconnect(); }catch(e){} }, 1500);
              }catch(e){}
            }catch(e){}
          })()`}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeLayout initialSidebarMinimized={sidebarMinimized === 'true'}>{children}</ThemeLayout>
      </body>
    </html>
  );
}
