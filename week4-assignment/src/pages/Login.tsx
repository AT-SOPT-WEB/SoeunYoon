export default function Login() {
    return (
      <div className="w-screen h-screen bg-indigo-50 flex items-center justify-center">
        <div className="w-96 bg-white bg-opacity-70 rounded-md shadow-[0px_3px_14px_rgba(85,128,20,0.2)] outline outline-[0.7px] outline-white p-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-semibold">
              <span className="text-darkSky">SUS</span>
              <span className="text-black"> 로그인</span>
            </h1>
          </div>
  
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-800">아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력해 주세요"
                className="pl-3 pr-4 py-2.5 text-xs text-zinc-700 bg-white rounded-md outline outline-[0.7px] outline-zinc-200 placeholder:text-zinc-500"
              />
            </div>
  
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-800">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                className="pl-3 pr-4 py-2.5 text-xs text-zinc-700 bg-white rounded-md outline outline-[0.7px] outline-zinc-200 placeholder:text-zinc-500"
              />
            </div>
  
            <div className="flex flex-col gap-3 mt-4">
              <button className="h-9 bg-darkSky text-white text-xs rounded hover:bg-darkSky-hover active:bg-darkSky-active transition">
                로그인
              </button>
              <button className="h-9 bg-lightSky text-zinc-800 text-xs rounded hover:bg-lightSky-hover active:bg-lightSky-active transition">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  