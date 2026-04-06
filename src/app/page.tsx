import { turso } from '@/lib/db';
import GuestbookUI from './GuestbookUI';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let entries: any[] = [];
  try {
    const result = await turso.execute('SELECT * FROM guestbook ORDER BY id DESC');
    entries = result.rows;
  } catch (e) {
    console.error("테이블 오류 (새로고침 시 해결됨):", e);
  }

  return (
    <div className="flex w-full max-w-[950px] h-[650px] justify-center relative">
      
      {/* 아웃라인 프레임 (파란색 계열) */}
      <div className="bg-[#65b9db] rounded-[20px] border-[2px] border-slate-600 flex p-[25px] w-full h-full shadow-2xl relative z-10">
        
        {/* 인너 하얀 노트북 느낌 영역 */}
        <div className="bg-white rounded-[15px] border-[2px] border-slate-600 w-full h-full flex p-1">
          {/* 점선 여백선 */}
          <div className="border-[2px] border-dashed border-[#a5a5a5] rounded-[10px] w-full h-full flex flex-row relative p-5 gap-6">
            
            {/* 왼쪽 사이드바 (프로필 영역 - 방장 고정) */}
            <div className="flex flex-col w-[210px] h-full">
              {/* 투데이 & 토탈 */}
              <div className="text-[11px] text-gray-500 mb-2 flex justify-center w-full font-bold tracking-wider">
                <span className="text-[#f76d28] mr-2">TODAY 28</span> | <span className="ml-2">TOTAL 1024</span>
              </div>
              
              {/* 프로필 박스 */}
              <div className="border-[2px] border-slate-300 rounded-[5px] flex-1 flex flex-col p-4 bg-white shadow-sm">
                <div className="text-[11px] text-[#f76d28] mb-3 font-bold border-b-[2px] border-dashed border-slate-300 pb-2">TODAY IS... 행복 🍀</div>
                
                {/* 픽셀 아바타 (미니미) 영역 */}
                <div className="flex-1 flex justify-center items-center mb-4">
                  <img src="/minimi.png" alt="미니미" className="w-[140px] h-[140px] object-cover hover:-translate-y-2 transition-transform cursor-pointer drop-shadow-md" />
                </div>
                
                {/* 상태 메시지 */}
                <div className="text-[12px] text-slate-700 font-bold mb-4 leading-relaxed tracking-wide">
                  만나서 반가워요!<br/>
                  회원님의 레트로 감성<br/>
                  미니홈피입니다 ✿<br/><br/>
                  <span className="text-blue-500">우측에서 프로필을 골라<br/>방명록을 남겨주세요!</span>
                </div>
                
                {/* 프로필 이름 */}
                <div className="text-[12px] text-[#2291d0] font-bold mt-auto mb-2 flex items-center justify-between">
                  <span>▶ 회원님 (주인장)</span>
                  <span>🏡</span>
                </div>
                
                {/* 파도타기 셀렉트박스 모방 */}
                <div className="w-full border border-slate-400 bg-gray-100 mt-2 p-1 text-[11px] text-center text-gray-500 cursor-pointer hover:bg-gray-200">
                  파도타기 ▼
                </div>
              </div>
            </div>

            {/* 오른쪽 메인 본문 (방명록 영역) */}
            <div className="flex-1 flex flex-col h-full relative">
              {/* 상단 타이틀 */}
              <div className="flex justify-between items-end border-b-[2px] border-slate-300 pb-3 mb-4">
                <h1 className="text-[18px] text-[#2291d0] font-bold tracking-tight">난... ㄱㅏ끔 눈물을 흘린ㄷr...★</h1>
                <span className="text-[11px] text-gray-500">http://cyworld.com/turso</span>
              </div>

              {/* 클라이언트 컴포넌트로 분리된 방명록 UI 렌더링 */}
              <GuestbookUI entries={entries as any[]} />
            </div>

          </div>
        </div>
      </div>
      
      {/* 우측 탭 메뉴들 */}
      <div className="absolute -right-[50px] top-12 flex flex-col gap-1 z-0">
        <div className="bg-[#2291d0] text-white text-[12px] p-2 py-3 px-4 w-[60px] border-[2px] border-slate-600 rounded-r-[10px] cursor-pointer hover:pl-5 transition-all">홈</div>
        <div className="bg-[#2291d0] text-white text-[12px] p-2 py-3 px-4 w-[60px] border-[2px] border-slate-600 rounded-r-[10px] cursor-pointer hover:pl-5 transition-all">프로필</div>
        
        {/* 활성 상태 탭 (방명록) */}
        <div className="bg-white text-black font-bold text-[12px] p-2 py-3 px-4 w-[65px] border-[2px] border-slate-600 border-l-0 rounded-r-[10px] translate-x-[-2px] cursor-default z-20 relative shadow-sm">방명록</div>
        
        <div className="bg-[#2291d0] text-white text-[12px] p-2 py-3 px-4 w-[60px] border-[2px] border-slate-600 rounded-r-[10px] cursor-pointer hover:pl-5 transition-all">사진첩</div>
        <div className="bg-[#2291d0] text-white text-[12px] p-2 py-3 px-4 w-[60px] border-[2px] border-slate-600 rounded-r-[10px] cursor-pointer hover:pl-5 transition-all">게시판</div>
      </div>
    </div>
  );
}
