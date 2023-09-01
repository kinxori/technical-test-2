import UserFilter from "./components/UserFilter";

export default function App() {
  return (
    <section className="relative mt-[20%] ">
      <div className="border-box p-10">
        <div>
          <h1 className="font-[rubik] font-bold text-[60px]  ">Hey there!</h1>
        </div>
        <UserFilter />
      </div>
    </section>
  );
}
