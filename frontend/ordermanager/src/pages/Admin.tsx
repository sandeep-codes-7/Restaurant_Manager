import Card from "../components/Card";
// import SearchBar from "../components/Searchbar";
import SearchBar from "../components/Searchbar";
export default function Admin() {
  return (
    <>
      <div className=" flex items-center justify-center px-4">
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <SearchBar />
          <div className="items-center justify-center flex flex-col space-y-4">
            <Card
              title="Menu"
              caption="available items list"
              buttonText="Take order"
            />
            <Card
              title="Orders"
              caption="shows available orders"
              buttonText="Show"
            />
          </div>
        </div>
      </div>
    </>
  );
}
