const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <span className="text-orange-500 font-bold text-xl">
          <span className="blue_gradient">Article</span>Sumz
        </span>

        <button
          type="button"
          onClick={() => window.open("https://github.com/surajkabirath")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summerize Articles With <br className="max-md:hidden" />
        <span className="orange_gradient">ChatGPT-4</span>
      </h1>

      <h2> Simplify Your Article with chatgpt</h2>
    </header>
  );
};

export default Hero;
