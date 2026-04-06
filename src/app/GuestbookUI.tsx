'use client';

import { useState, useEffect } from 'react';
import { addGuestbookEntry, deleteGuestbookEntry } from './actions';

type Entry = {
  id: number;
  author: string;
  icon: string;
  message: string;
  created_at: string;
};

export default function GuestbookUI({ entries }: { entries: Entry[] }) {
  const [profile, setProfile] = useState<{name: string, icon: string} | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [tempName, setTempName] = useState('');
  const [tempIcon, setTempIcon] = useState('/cat.png');

  useEffect(() => {
    // 로컬 스토리지에서 이전 설정 불러오기
    const saved = localStorage.getItem('guestProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSaveProfile = () => {
    if (!tempName.trim()) return alert('닉네임을 한 글자 이상 입력해주세요!');
    const newProfile = { name: tempName, icon: tempIcon };
    localStorage.setItem('guestProfile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setShowModal(false);
  };

  return (
    <>
      {/* 방명록 메인 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto mb-2 pr-3 pb-6">
        {/* 글쓰기 영역 (일촌평/방명록) */}
        <div className="bg-[#f5f5f5] border-[2px] border-slate-300 p-4 mb-6 relative">
          <h2 className="text-[13px] font-bold text-[#2291d0] mb-3 flex items-center justify-between">
            <span>일촌평 남기기 <span className="text-[10px] text-gray-500 font-normal ml-2">(우측 아바타를 누르면 언제든 프로필을 바꿀 수 있어요!)</span></span>
          </h2>
          
          <form action={addGuestbookEntry} className="flex gap-2 items-center">
            {/* 서버 액션용 숨김 필드 */}
            <input type="hidden" name="author" value={profile?.name || '익명'} />
            <input type="hidden" name="icon" value={profile?.icon || '/cat.png'} />
            
            <div 
              className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105" 
              onClick={() => setShowModal(true)} 
              title="프로필 다시 고르기"
            >
              <img src={profile?.icon || "/cat.png"} alt="mini" className="w-[45px] h-[45px] rounded-full border-[2px] border-slate-400 bg-white object-cover" />
              <span className="text-[10px] bg-slate-200 px-2 py-[2px] rounded-sm font-bold text-slate-600 truncate max-w-[60px]">{profile?.name || '손님'}</span>
            </div>
            
            <input 
              type="text" 
              name="message" 
              placeholder="여기에 남기고 싶은 글을 적어주세요..." 
              required
              className="flex-1 border-[2px] border-slate-400 text-[12px] p-2 h-[45px] bg-white text-black focus:outline-none focus:border-[#f76d28]" 
            />
            
            <button type="submit" className="border-[2px] border-slate-400 bg-white px-4 h-[45px] text-[13px] font-bold text-gray-700 hover:bg-[#f76d28] hover:text-white hover:border-[#f76d28] transition-colors cursor-pointer">
              확인
            </button>
          </form>
        </div>

        {/* 방명록 리스트 */}
        <div className="flex flex-col gap-6">
          {entries.map((entry, index) => (
            <div key={entry.id} className="bg-[#f9f9f9] border border-slate-300 relative group shadow-sm">
              
              {/* 삭제 버튼 */}
              <div className="absolute right-2 top-1.5 z-10">
                <form action={deleteGuestbookEntry}>
                  <input type="hidden" name="id" value={entry.id} />
                  <button type="submit" className="text-[10px] text-gray-500 bg-white border border-gray-400 px-2 py-0.5 rounded-sm hover:text-white hover:bg-red-500 hover:border-red-500 transition-colors cursor-pointer">
                    삭제
                  </button>
                </form>
              </div>

              {/* 카드 헤더 */}
              <div className="bg-[#e9e9e9] border-b border-slate-300 p-2 px-3 text-[12px] text-slate-700 flex justify-between tracking-wide pr-[60px]">
                <span>No. {entries.length - index} <span className="text-[#2291d0] font-bold ml-2">{entry.author}</span></span>
                <span>{entry.created_at ? entry.created_at.split(' ')[0] : '방금 전'}</span>
              </div>
              
              {/* 카드 본문 */}
              <div className="p-4 text-[13px] flex gap-4 min-h-[80px]">
                <img src={entry.icon} alt="user icon" className="w-[50px] h-[50px] border border-slate-400 bg-white object-cover" />
                <div className="flex-1 text-slate-800 leading-relaxed font-bold break-all">
                  {entry.message}
                </div>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="text-center text-[13px] text-slate-500 py-10 font-bold border-[2px] border-dashed border-slate-300 mx-10">첫 방명록을 개시해 주세요! (❁´◡`❁)</div>
          )}
        </div>
      </div>

      {/* 첫 방문자 프로필 설정 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-[3px] border-slate-600 rounded-[15px] p-6 w-full max-w-[380px] shadow-2xl relative overflow-hidden">
            {/* 데코레이션 띠 */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#7fc3e6]"></div>
            
            <h3 className="text-[#2291d0] font-bold text-[18px] mb-2 mt-2 text-center">환영합니다! 👋</h3>
            <p className="text-[12px] text-gray-600 text-center mb-6 pb-4 border-b-[2px] border-dashed border-slate-300">
              미니홈피에서 사용할 귀여운 아바타와<br/>당신을 부를 수 있는 닉네임을 설정해 주세요.
            </p>
            
            {/* 아바타 선택 섹션 */}
            <label className="block text-[13px] font-bold mb-3 text-center text-slate-700">원하는 아바타 선택</label>
            <div className="flex justify-center gap-4 mb-8">
              {[
                {id: '/cat.png', name: '고양이'},
                {id: '/dog.png', name: '강아지'},
                {id: '/rabbit.png', name: '토끼'}
              ].map(avatar => (
                <div 
                  key={avatar.id} 
                  onClick={() => setTempIcon(avatar.id)}
                  className={`cursor-pointer border-[3px] rounded-[10px] p-1.5 transition-all outline-none 
                    ${tempIcon === avatar.id ? 'border-[#f76d28] bg-orange-50 transform -translate-y-1 shadow-md' : 'border-slate-200 hover:border-slate-400 bg-white'}`}
                >
                  <img src={avatar.id} alt={avatar.name} className="w-[60px] h-[60px] object-cover rounded bg-white" />
                  <div className={`text-center text-[10px] mt-1 font-bold ${tempIcon === avatar.id ? 'text-[#f76d28]' : 'text-slate-400'}`}>
                    {avatar.name}
                  </div>
                </div>
              ))}
            </div>

            {/* 닉네임 입력 섹션 */}
            <div className="mb-8">
              <label className="block text-[13px] font-bold mb-2 text-center text-slate-700">어떤 닉네임으로 부를까요?</label>
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="닉네임 입력 (예: 지나가는 행인)"
                className="w-full border-[2px] border-slate-400 p-3 rounded-[8px] text-[13px] text-center font-bold focus:outline-none focus:border-[#2291d0] focus:shadow-sm"
              />
            </div>

            <button 
              onClick={handleSaveProfile}
              className="w-full bg-[#f76d28] text-white font-bold py-3.5 rounded-[10px] text-[15px] hover:bg-orange-600 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              미니홈피 입장하기 🚀
            </button>
          </div>
        </div>
      )}
    </>
  );
}
