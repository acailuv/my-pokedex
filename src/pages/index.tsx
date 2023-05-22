import { PokemonListItem } from "@/types/Responses";
import { formatName } from "@/utils/formatName";
import { Card, Pagination, Space, Typography } from "antd";
import usePokemonList from "hooks/usePokemonList";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [pokemonList, totalPokemonCount, nextPage, prevPage] = usePokemonList();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > currentPage) {
      nextPage();
    } else {
      prevPage();
    }

    setCurrentPage(pageNumber);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography.Title>Pokedex</Typography.Title>
      <Space direction="vertical">
        {pokemonList.map((v: PokemonListItem) => (
          <Card
            style={{ margin: "0 20%" }}
            onClick={() => {
              const parsedUrl = v.url.split("/");
              router.push(`${parsedUrl[parsedUrl.length - 2]}`);
            }}
          >
            <b>{formatName(v.name)}</b>
          </Card>
        ))}
      </Space>
      <Pagination
        total={totalPokemonCount}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
}
