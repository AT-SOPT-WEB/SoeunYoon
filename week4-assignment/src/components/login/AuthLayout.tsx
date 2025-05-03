interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  highlight: string;
  optionalText?: string;
}

export default function AuthLayout({
  children,
  title,
  highlight,
  optionalText,
}: AuthLayoutProps) {
  return (
    <div className="w-screen h-screen bg-indigo-50 flex items-center justify-center">
      <div className="w-96 bg-white bg-opacity-70 rounded-md shadow-[0px_3px_14px_rgba(85,128,20,0.2)] outline outline-[0.7px] outline-white p-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold mb-2">
            <span className="text-darkSky">{highlight}</span>
            <span className="text-black"> {title}</span>
          </h1>
          {optionalText && (
            <p className="my-6 text-sm text-black">{optionalText}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
