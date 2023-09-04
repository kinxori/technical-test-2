import UserFilter from "./components/UserFilter";
import bgImg from "./assets/kinxori-background-for-assets-template.png";

export default function App() {
  return (
    <section className="relative ">
      <img src={bgImg} className="fixed z-[-1000] w-screen h-screen object-cover " />
      <div className="border-box p-10 flex flex-col gap-5 h-screen ms:p-[10%] ms:gap-10 ls:gap-20 ls:p-[10%] ls:flex-row ls:justify-evenly ls:items-center  ">
        <div className="flex flex-col gap-3 text-justify ls:gap-5 ls:w-[80%]  ">
          <h1 className="font-[rubik] font-bold text-[60px] text-left underline ls:text-[80px] ">
            Hey there!
          </h1>
          <p className="ls:w-[90%]">
            Welcome, this is my second #technicalTest I've had to complete for a Frontend JR role!
          </p>
          <p className="ls:w-[90%]">
            The main purpose of this project was to test <b className="italic">Array Methods</b>.
            For this test, there was 3 main points to complete:
          </p>
          <ul className="list-disc pl-8">
            <li>Remove repeated contacts</li>
            <li>Sorting contacts by number of calls</li>
            <li>Sorting contacts by call history</li>
          </ul>
        </div>
        <UserFilter />
      </div>
      <article className="border-box p-10 font-[inter] flex flex-col gap-5">
        <h3 className="font-bold text-[20px] ">Technical Implementations</h3>
        <p>Reduce repeated users:</p>
      </article>
    </section>
  );
}
