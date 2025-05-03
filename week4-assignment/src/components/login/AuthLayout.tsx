interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    highlight: string;
  }
  
  export default function AuthLayout({ children, title, highlight }: AuthLayoutProps) {
    return (
      <div className="w-screen h-screen bg-indigo-50 flex items-center justify-center">
        <div className="w-96 bg-white bg-opacity-70 rounded-md shadow-[0px_3px_14px_rgba(85,128,20,0.2)] outline outline-[0.7px] outline-white p-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-semibold">
              <span className="text-darkSky">{highlight}</span>
              <span className="text-black"> {title}</span>
            </h1>
          </div>
          {children}
        </div>
      </div>
    );
  }
  