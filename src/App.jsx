import UserFilter from "./components/UserFilter";
import bgImg from "./assets/kinxori-background-for-assets-template.png";

export default function App() {
  return (
    <section className="relative mt-[20%] ">
      <img src={bgImg} className="fixed z-[-1000] w-screen h-screen object-cover " />
      <div className="border-box p-10">
        <div>
          <h1 className="font-[rubik] font-bold text-[60px]  ">Hey there!</h1>
        </div>
        <UserFilter />
      </div>
    </section>
  );
}
