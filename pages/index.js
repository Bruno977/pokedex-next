import ListPokemon from "../components/ListPokemon";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";

export default function Home({ types }) {
  return (
    <>
      <div className="container md-pd">
        <div className="columns sm-gap">
          <div className="col-md-3 col-sm-12">
            <Sidebar types={types} />
          </div>

          <div className="col-md-9 col-sm-12">
            <main>
              <ListPokemon />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const type = await api.get("/type");

  return {
    props: {
      types: type.data.results,
    },
  };
}
