import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Award, CheckCircle, Send, Play, 
  FileText, TrendingUp, Mail, ChevronRight, 
  ExternalLink, Star, Target, Zap, Shield, Search, Quote
} from 'lucide-react';

// ロゴコンポーネント
const Logo = ({ size = "normal" }) => {
  const isLarge = size === "large";
  
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${isLarge ? "flex-col scale-110 md:scale-125" : ""}`}>
      <div className="relative">
        <div className={`${isLarge ? "w-32 h-32 border-4" : "w-10 h-10 border-2"} border-slate-300 rounded-full flex items-center justify-center relative overflow-hidden bg-slate-900 shadow-xl`}>
          <div className="absolute inset-0 bg-amber-500/10 blur-sm"></div>
          <Shield className={`${isLarge ? "w-16 h-16" : "w-5 h-5"} text-amber-500 z-10`} fill="currentColor" fillOpacity={0.2} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${isLarge ? "w-4 h-0.5" : "w-1.5 h-px"} bg-amber-500 absolute rotate-90`}></div>
            <div className={`${isLarge ? "w-4 h-0.5" : "w-1.5 h-px"} bg-amber-500 absolute`}></div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col ${isLarge ? "items-center mt-6" : "items-start"}`}>
        <span className={`font-serif tracking-[0.1em] leading-none text-white ${isLarge ? "text-5xl" : "text-xl"} uppercase`}>Judge</span>
        <div className={`h-px bg-amber-500 my-1 ${isLarge ? "w-24" : "w-8"}`}></div>
        <span className={`font-sans font-black tracking-[0.2em] text-amber-500 uppercase ${isLarge ? "text-[10px]" : "text-[8px]"}`}>Professional</span>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  const LINKS = {
    SINGLE: "https://mosh.jp/services/342245",
    PACK: "https://mosh.jp/services/342244",
    PROFILE: "https://mosh.jp/gymjudge_online/profile",
    CONTACT: "https://forms.gle/DnDz89eL5cKLfz7YA"
  };

  const navItems = [
    { name: 'Philosophy', label: '理念', id: 'philosophy' },
    { name: 'Message', label: 'ご挨拶', id: 'message' },
    { name: 'Sample', label: '事例', id: 'sample' },
    { name: 'Services', label: 'プラン', id: 'services' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans selection:bg-amber-200 selection:text-slate-900 overflow-x-hidden leading-relaxed">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0f1a]/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center text-white">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <Logo />
             <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
             <span className="hidden sm:block text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase italic leading-none">Gym Judge <span className="text-white font-black">Online</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className="group flex flex-col items-center cursor-pointer"
              >
                <span className="text-[9px] font-black text-amber-500 uppercase opacity-0 group-hover:opacity-100 transition-all transform -translate-y-1 tracking-widest leading-none">{item.name}</span>
                <span className="text-sm font-bold text-slate-300 hover:text-white transition-colors leading-none">{item.label}</span>
              </a>
            ))}
            <a 
              href={LINKS.SINGLE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-amber-600 to-amber-400 text-slate-900 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-xl"
            >
              依頼する
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white" aria-label="メニュー">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/5 px-6 py-10 space-y-8 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                className="block text-xl font-bold text-slate-300" 
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
                <a href={LINKS.CONTACT} target="_blank" rel="noopener noreferrer" className="block text-amber-500 font-bold">お問い合わせ</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
          {/* CSS Pattern Instead of Image for stability */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1a]/50 to-[#0a0f1a]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full text-white text-left">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-amber-500 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">Professional Judging Service</span>
              <div className="h-px flex-grow bg-gradient-to-r from-amber-500 to-transparent"></div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-12 leading-[1.4] tracking-tighter italic uppercase">
              あなたの演技を、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-amber-100 font-black italic leading-[1.4]">審判の視点</span>で。
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-200 mb-14 max-w-2xl leading-[1.9] font-medium">
              減点の理由を、細部まで徹底的に解説。<br className="hidden md:block" />
              現役審判員が、あなたの演技を論理的に言語化し、<br className="hidden md:block" />
              確実に点数へと繋げます。
            </p>

            <div className="flex flex-wrap gap-6">
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, 'services')}
                className="group relative px-10 py-5 bg-amber-500 text-slate-900 font-black rounded-2xl transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-3 text-xl uppercase italic tracking-tighter cursor-pointer"
              >
                依頼メニュー <ChevronRight size={24} />
              </a>
              <a 
                href="#sample" 
                onClick={(e) => scrollToSection(e, 'sample')}
                className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm text-white font-black rounded-2xl transition-all text-xl uppercase italic tracking-tighter cursor-pointer"
              >
                レポート事例
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-28 relative border-y border-white/5 bg-[#0a0f1a] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { 
                icon: <Target className="w-10 h-10 text-amber-500" />, 
                title: "Dスコア判定", 
                eng: "D-Score Judgment",
                desc: "技の認定・格下げの境界線を明確に。審判員としての論理的な基準を明示します。" 
              },
              { 
                icon: <Zap className="w-10 h-10 text-amber-500" />, 
                title: "Eスコア詳細解析", 
                eng: "E-Score Analysis",
                desc: "審判員がどこで減点しているかを可視化します。" 
              },
              { 
                icon: <Star className="w-10 h-10 text-amber-500" />, 
                title: "戦略的アドバイス", 
                eng: "Strategic Advice",
                desc: "ただ採点するだけでなく、点数を最大化するための「見せ方」や「構成案」を具体的に提案します。" 
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all duration-500">
                <div className="mb-8 p-4 bg-[#0a0f1a] rounded-2xl inline-block border border-white/5 shadow-xl group-hover:border-amber-500/30 transition-colors text-white">
                  {item.icon}
                </div>
                <div className="mb-6">
                  <span className="text-[10px] font-black text-amber-500/50 uppercase tracking-[0.3em] block mb-2 leading-none">{item.eng}</span>
                  <h3 className="text-2xl font-black tracking-tight uppercase italic leading-[1.45]">{item.title}</h3>
                </div>
                <p className="text-slate-400 leading-[1.9] font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Greeting Section */}
      <section id="message" className="py-28 relative bg-[#0a0f1a] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center text-white">
            <Quote className="w-12 h-12 text-amber-500/20 mx-auto mb-10" />
            <h2 className="text-2xl md:text-4xl font-black mb-12 italic leading-[1.8]">
                「なぜ」を「納得」へ変え、<br />
                選手の努力を正当なスコアへ繋ぐ。
            </h2>
            <div className="space-y-8 text-slate-300 text-lg md:text-xl leading-[2.2] font-medium max-w-3xl mx-auto">
                <p>
                    体操競技のルールは年々複雑化しており、選手自身が気づかない「隠れた減点」が多く存在します。
                </p>
                <p>
                    私は審判席から多くの演技を見てきましたが、あと少しの意識で防げる減点や、構成の工夫で得られる点数を逃しているケースが非常に多いと感じてきました。
                </p>
                <p>
                    このサービスは、審判の思考を透明化し、選手や指導者の皆様に「正当な評価」を届ける橋渡しをすることを目的に設立しました。
                </p>
                <p className="text-white font-black border-y border-amber-500/20 py-5 inline-block px-12 italic tracking-tight leading-relaxed">
                    理由のない減点は存在しません。
                </p>
                <p>
                    選手の努力が正当な評価へと結実するよう、プロの視点から全力でサポートいたします。
                </p>
            </div>
            <div className="mt-16 inline-block">
                <div className="text-amber-500 font-black italic tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4 leading-none text-white">Director / Official Judge</div>
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-5"></div>
                <div className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none uppercase text-white">GYM JUDGE ONLINE</div>
            </div>
        </div>
      </section>

      {/* Sample Feedback Section */}
      <section id="sample" className="py-32 relative bg-slate-900 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-white">
          <div className="text-center mb-24">
            <span className="text-amber-500 font-black tracking-[0.5em] text-[10px] md:text-xs uppercase block mb-6 leading-none">Case Study</span>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[1.35] mb-10 text-white">レポートサンプル</h2>
            <div className="space-y-6">
                <p className="text-slate-400 font-medium leading-none">実際に納品されるフィードバックシートの構成例です。</p>
                <div className="bg-amber-500/10 inline-block px-8 py-3 rounded-full border border-amber-500/30">
                    <p className="text-amber-400 font-bold text-sm leading-tight italic">
                        ※実際に送られてくるフィードバックの構成とは異なります。
                    </p>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl text-slate-900 max-w-4xl mx-auto border-[10px] border-slate-800 relative z-10">
            <div className="bg-slate-100 p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-slate-900">
                    <div className="p-3 bg-slate-900 text-amber-500 rounded-2xl shadow-lg"><Award /></div>
                    <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest mb-2 leading-none">Category</span>
                        <span className="text-xl font-black italic leading-none uppercase">男子 鉄棒 / Horizontal Bar</span>
                    </div>
                </div>
                <div className="flex gap-4 font-sans text-slate-900">
                    <div className="text-center bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-bold block text-slate-400 uppercase mb-2 leading-none">D-Score</span>
                        <span className="text-2xl font-black text-blue-600 leading-none">5.2</span>
                    </div>
                    <div className="text-center bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-[10px] font-bold block text-slate-400 uppercase mb-2 leading-none">E-Score</span>
                        <span className="text-2xl font-black text-amber-600 leading-none">8.1</span>
                    </div>
                </div>
            </div>
            
            <div className="p-8 md:p-14 space-y-14 text-slate-900 text-left">
                <div className="space-y-6">
                    <h4 className="flex items-center gap-3 font-black text-slate-400 text-xs uppercase tracking-widest leading-none">
                        <Search className="w-5 h-5 text-indigo-500" /> Dスコア判定の境界線
                    </h4>
                    <div className="bg-red-50 border border-red-100 rounded-[32px] p-8 relative overflow-hidden shadow-inner text-left">
                        <div className="absolute top-0 right-0 bg-red-600 text-white px-5 py-2 font-black text-[10px] uppercase tracking-tighter rounded-bl-xl">格下げ判定 / Downgraded</div>
                        <h5 className="text-xl font-black mb-4 text-slate-900 leading-[1.4] italic">伸身トカチェフ (D難度) → C判定への格下げ</h5>
                        <p className="text-slate-600 leading-[1.9] text-sm font-medium">
                            バーを越える瞬間に<span className="font-bold text-red-600 underline underline-offset-4 decoration-2">45°以上の腰曲がり</span>が確認されました。これにより伸身姿勢とは認められず、<span className="font-bold text-slate-900 italic font-black uppercase">C難度のトカチェフ</span>として判定されます。練習の段階から、蹴り出しのタイミングをコンマ数秒遅らせる意識が必要です。
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="flex items-center gap-3 font-black text-slate-400 text-xs uppercase tracking-widest leading-none">
                        <Zap className="w-5 h-5 text-amber-500" /> Eスコア可視化
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-amber-200 transition-colors text-left">
                            <div className="flex justify-between items-center mb-4 text-slate-900">
                                <span className="font-bold text-sm leading-none text-left text-slate-900">車輪：膝の曲がり</span>
                                <span className="font-black text-amber-600 bg-amber-100 px-3 py-1.5 rounded-lg text-xs leading-none">-0.1</span>
                            </div>
                            <p className="text-xs text-slate-500 italic leading-[1.8]">倒立付近でわずかに膝が緩んでいます。実施全体に影響するポイントです。</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-red-200 transition-colors text-left">
                            <div className="flex justify-between items-center mb-4 text-slate-900">
                                <span className="font-bold text-sm text-red-700 leading-none font-black italic leading-none text-left">トカチェフ：姿勢欠陥</span>
                                <span className="font-black text-amber-600 bg-amber-100 px-3 py-1.5 rounded-lg text-xs leading-none">-0.3</span>
                            </div>
                            <p className="text-xs text-slate-500 italic leading-[1.8]">前述の腰曲がりにより、姿勢の大きな乱れとして0.3以上の減点となります。</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-10 rounded-[32px] relative shadow-2xl overflow-hidden group text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] group-hover:bg-amber-500/20 transition-all duration-500"></div>
                    <div className="absolute -top-4 left-8 bg-amber-500 text-slate-900 font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest italic leading-none shadow-lg">Solution</div>
                    <p className="text-lg md:text-xl leading-[1.9] font-medium border-l-4 border-amber-500 pl-8 italic">
                        「このトカチェフ1つで、<span className="text-amber-500 font-black underline decoration-amber-500/30 underline-offset-4 tracking-tight">合計0.4点</span>をロスしています。姿勢を正すだけで、新たな技術を習得せずともスコアは大幅に跳ね上がります。」
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white text-slate-900 rounded-t-[60px] lg:rounded-t-[100px] shadow-[0_-20px_100px_rgba(0,0,0,0.7)] relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-slate-900">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 text-left">
            <div className="max-w-2xl">
              <span className="text-amber-600 font-black tracking-widest text-xs uppercase block mb-6 leading-none">Strategic Selection</span>
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[1.25] italic uppercase text-slate-900 text-left">The Plans.</h2>
              <p className="text-xl text-slate-500 font-medium leading-[1.85] text-left">
                プロの視点で、あなたの現在の実力を証明し、<br className="hidden md:block" />
                弱点を明確にするための2つの解析プラン。
              </p>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl mb-5 inline-block italic leading-none">
                 同一週の複数申し込み可
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic leading-none">Orders can be combined at any time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Single Plan */}
            <div className="relative group overflow-hidden bg-slate-50 rounded-[60px] p-12 md:p-14 border border-slate-200 hover:shadow-3xl transition-all duration-700 text-left">
              <div className="absolute top-10 right-10 text-[10px] font-black bg-white border border-slate-200 text-slate-400 px-6 py-2 rounded-full uppercase tracking-widest shadow-sm leading-none">
                Single Plan
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-16 text-slate-900">
                  <div className="p-8 bg-white shadow-xl rounded-[32px] border border-slate-100 group-hover:scale-105 transition-transform duration-500 text-slate-900">
                    <Play className="w-12 h-12 text-blue-600 fill-current" />
                  </div>
                  {/* Changed layout to prevent overlap - Stacking items */}
                  <div className="text-right font-sans text-slate-900 flex flex-col items-end">
                    <div className="text-[10px] font-black bg-white border border-slate-200 text-slate-400 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm leading-none mb-3">
                        Single Plan
                    </div>
                    <div className="text-[11px] font-black text-amber-600 uppercase tracking-widest mb-4 italic underline decoration-amber-500/30 underline-offset-8 leading-none">Weekly Limit: 30 Clips</div>
                    <div className="text-6xl font-black tracking-tighter flex items-baseline gap-1 leading-none text-slate-900">
                      <span className="text-3xl font-bold italic text-slate-900">¥</span>250
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black mb-10 italic uppercase tracking-tighter border-l-4 border-blue-600 pl-8 leading-[1.35] text-slate-900 text-left">【1種目】単品プラン</h3>
                <p className="text-slate-500 text-lg md:text-xl mb-14 font-medium leading-[1.95] text-left">
                  特定種目の課題を最短で解決。Dスコア判定とEスコアの細かな内訳を、PDFレポート2枚に凝縮してお届けします。
                </p>
                
                <ul className="space-y-10 mb-16 flex-grow text-slate-900">
                  <li className="flex items-center gap-6 font-bold text-slate-700">
                      <CheckCircle className="w-9 h-9 text-blue-600 shrink-0 shadow-lg shadow-blue-500/10" />
                      <div className="leading-tight text-left">
                        週 <span className="text-blue-600 text-2xl font-black font-sans leading-none">30演技</span> 限定受付
                        <span className="block text-[11px] text-slate-400 mt-2 font-medium italic leading-none">※1人で何演技でも申し込み可能</span>
                      </div>
                  </li>
                  <li className="flex items-center gap-6 font-bold text-slate-700 leading-none">
                    <CheckCircle className="w-9 h-9 text-blue-600 shrink-0 shadow-lg shadow-blue-500/10" />
                    <span className="leading-tight text-lg leading-none text-left">技の認定・格下げの境界線を明示</span>
                  </li>
                  <li className="flex items-center gap-6 font-bold text-slate-700 leading-none">
                    <CheckCircle className="w-9 h-9 text-blue-600 shrink-0 shadow-lg shadow-blue-500/10" />
                    <span className="leading-tight text-lg italic uppercase tracking-tighter tracking-tight text-left">Strategic Advice</span>
                  </li>
                </ul>

                <a 
                  href={LINKS.SINGLE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 text-white py-8 rounded-[30px] font-black text-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.03] shadow-2xl shadow-slate-900/20 italic uppercase tracking-tighter"
                >
                  Request Single <ExternalLink size={24} />
                </a>
              </div>
            </div>

            {/* Premium Pack */}
            <div className="relative group overflow-hidden bg-slate-900 text-white rounded-[60px] p-12 md:p-14 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] transition-all duration-700 border border-slate-800 text-white text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/15 to-transparent opacity-60"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-16 text-white">
                  <div className="p-8 bg-amber-500 text-slate-900 shadow-2xl rounded-[32px] animate-pulse group-hover:scale-105 transition-transform duration-500 text-slate-900">
                    <TrendingUp className="w-12 h-12 text-slate-900" />
                  </div>
                  {/* Changed layout to prevent overlap - Stacking items */}
                  <div className="text-right font-sans text-white flex flex-col items-end">
                    <div className="text-[10px] font-black bg-white/10 border border-white/10 text-white/50 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg leading-none mb-3">
                        Full Package
                    </div>
                    <div className="text-[12px] font-black text-amber-500 uppercase tracking-widest mb-4 italic underline decoration-amber-500/30 underline-offset-8 leading-none">Weekly Limit: 20 Users</div>
                    <div className="text-6xl font-black tracking-tighter flex items-baseline gap-1 leading-none text-amber-500">
                      <span className="text-3xl font-bold italic text-amber-500">¥</span>1,300
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black mb-10 italic uppercase tracking-tighter text-amber-500 border-l-4 border-amber-500 pl-8 leading-[1.35] text-amber-500 text-left">【6種目】フルパック</h3>
                <p className="text-slate-300 text-lg md:text-xl mb-14 font-medium leading-[1.85] text-left">
                  男子全種目を網羅し、大会本番の合計スコアを算出。総合的な実力分析から、点数を伸ばすための全体構成案を提示します。
                </p>
                
                <ul className="space-y-10 mb-16 flex-grow text-white">
                  <li className="flex items-center gap-6 font-bold leading-none text-left">
                      <CheckCircle className="w-9 h-9 text-amber-500 shrink-0 shadow-lg shadow-amber-500/20 text-amber-500" />
                      <div className="leading-tight text-slate-100 text-left">
                        週 <span className="text-amber-500 text-2xl font-black font-sans leading-none text-amber-500">20名</span> 限定受付
                        <span className="block text-[11px] text-slate-500 mt-2 font-medium italic leading-none">※1人で複数パックの同時申し込みも可能</span>
                      </div>
                  </li>
                  <li className="flex items-center gap-6 font-bold text-slate-100 leading-none text-left">
                    <CheckCircle className="w-9 h-9 text-amber-500 shrink-0 shadow-lg shadow-amber-500/20 text-amber-500" />
                    <span className="leading-tight text-lg leading-none text-left text-white">全6種目の同時解析・合計算出</span>
                  </li>
                  <li className="flex items-center gap-6 font-bold text-slate-100 leading-none text-left">
                    <CheckCircle className="w-9 h-9 text-amber-500 shrink-0 shadow-lg shadow-amber-500/20 text-amber-500" />
                    <span className="leading-tight text-lg italic uppercase tracking-tighter leading-none text-left text-white">Strategic Planning</span>
                  </li>
                </ul>

                <a 
                  href={LINKS.PACK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-500 text-slate-900 py-8 rounded-[30px] font-black text-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.03] shadow-[0_0_60px_rgba(245,158,11,0.5)] italic uppercase tracking-tighter"
                >
                  Request Full <ExternalLink size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-32 relative bg-white text-slate-900 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-slate-900 text-left">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-2/5 w-full flex justify-center">
               <Logo size="large" />
            </div>
            
            <div className="lg:w-3/5 text-slate-900 text-left">
               <span className="text-amber-600 font-black tracking-widest text-[10px] md:text-xs uppercase block mb-6 leading-none">Official Judge Profile</span>
               <h2 className="text-4xl md:text-6xl font-black mb-12 leading-[1.4] tracking-tighter italic uppercase text-slate-900 text-left">
                 From the Bench.<br />
                 <span className="text-slate-300">To Your Victory.</span>
               </h2>
               <p className="text-xl md:text-2xl text-slate-500 mb-14 font-medium leading-[2.1] border-l-4 border-slate-900 pl-10 italic text-left">
                 最高峰の舞台で多くの演技を見てきました。<br className="hidden md:block" />
                 その経験から言えるのは、点数が伸びない最大の理由は技術力不足ではなく、<br className="hidden md:block" />
                 審判の「見ているポイント」の理解不足にあります。
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 text-left">
                 {[
                   "全日本選手権 審判実績",
                   "1種審判員資格 保持",
                   "インカレ 審判実績",
                   "国民スポーツ大会 審判実績"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 bg-slate-50 p-7 rounded-[30px] border border-slate-100 font-black text-sm uppercase italic leading-none transition-all hover:bg-white hover:shadow-2xl hover:border-amber-200 text-left">
                     <Award className="text-amber-600 shrink-0 leading-none text-amber-600" size={24} /> 
                     <span className="text-slate-900 text-left">{item}</span>
                   </div>
                 ))}
               </div>

               <a href={LINKS.PROFILE} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-6 text-slate-900 font-black text-3xl transition-all border-b-8 border-slate-900 pb-4 italic uppercase tracking-tighter hover:text-amber-600 hover:border-amber-600 leading-none text-left">
                 MOSH Profile <ExternalLink size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1a] pt-40 pb-16 text-slate-500 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24 text-white">
            <Logo />
            <div className="flex flex-col gap-6 text-left md:text-right">
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-600 italic leading-none">Official Inquiry</span>
              <a 
                href={LINKS.CONTACT} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-5 text-white leading-none hover:text-amber-500 transition-colors group"
              >
                <Mail className="text-amber-500 w-8 h-8 leading-none group-hover:scale-110 transition-transform" />
                <span className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none uppercase text-white">お問い合わせフォーム</span>
              </a>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
            <div className="flex gap-14">
              <a href="#services" className="hover:text-amber-500 transition-colors uppercase tracking-widest leading-none">Services</a>
              <a href="#message" className="hover:text-amber-500 transition-colors uppercase tracking-widest leading-none">Message</a>
              <a href={LINKS.PROFILE} className="hover:text-amber-500 transition-colors uppercase tracking-widest leading-none">Profile</a>
            </div>
            <div className="text-slate-600 italic leading-none uppercase">© 2026 <span className="text-white font-black italic uppercase tracking-widest text-white">GYM JUDGE ONLINE</span>. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
