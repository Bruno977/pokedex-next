import Image from "next/image";
import { useState } from "react";
import ListPokemon from "../components/ListPokemon";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";

export default function Home({ types }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="container md-pd">
        <div className="columns sm-gap">
          <div className="col-md-3 col-sm-12">
            <div onClick={() => setOpenMenu(true)} className="hide-desktop">
              <Image
                src="/images/hamburguer.svg"
                alt="Abrir menu"
                width="24"
                height="24"
              />
            </div>
            <Sidebar
              types={types}
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
            />
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
