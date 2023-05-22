import { formatName } from "@/utils/formatName";
import { makeEvolutionTimelineItems } from "@/utils/makeEvolutionTimelineItems";
import { padNumber } from "@/utils/padNumber";
import { typeToColor } from "@/utils/typeToColor";
import {
  Button,
  Card,
  Progress,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Timeline,
  Typography,
} from "antd";
import usePokemonDetails from "hooks/usePokemonDetails";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return "Loading...";

  const [pokemonDetails, evolutionChain] = usePokemonDetails(id as string);
  if (!pokemonDetails || !evolutionChain) return "Loading...";

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `About`,
      children: (
        <div>
          <Space direction="vertical">
            <Typography.Text>
              Species: {formatName(pokemonDetails.species.name)}
            </Typography.Text>
            <Typography.Text>
              Height: {pokemonDetails.height} Decimeters
            </Typography.Text>
            <Typography.Text>
              Weight: {pokemonDetails.weight} Hectograms
            </Typography.Text>
            <Typography.Text>
              Abilities:{" "}
              {pokemonDetails.abilities
                .map((v: any) => formatName(v.ability.name))
                .join(", ")}
            </Typography.Text>
          </Space>
        </div>
      ),
    },
    {
      key: "2",
      label: `Base Stats`,
      children: (
        <div>
          <Space direction="vertical" style={{ display: "flex" }}>
            {pokemonDetails.stats.map((v: any) => (
              <Typography.Text>
                {formatName(v.stat.name)}:{" "}
                <Progress
                  percent={v.base_stat}
                  format={(percent) => `${percent}`}
                />
              </Typography.Text>
            ))}
          </Space>
        </div>
      ),
    },
    {
      key: "3",
      label: `Evolution`,
      children: (
        <div>
          <Timeline items={makeEvolutionTimelineItems(evolutionChain)} />
        </div>
      ),
    },
    {
      key: "4",
      label: `Moves`,
      children: (
        <div>
          <ol>
            {pokemonDetails.moves.map((v: any) => (
              <li>
                <Typography.Text>{formatName(v.move.name)}</Typography.Text>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10%",
        marginLeft: "40%",
        maxWidth: "400px",
      }}
    >
      <Button
        onClick={() => router.push("/")}
        icon={<DoubleLeftOutlined />}
        type="link"
        size="large"
      >
        Back
      </Button>
      <Card
        title={
          <Typography.Title level={2}>
            {formatName(pokemonDetails.name)}
          </Typography.Title>
        }
      >
        <img
          src={pokemonDetails.sprites.front_default}
          style={{
            border: `1px solid ${typeToColor(
              pokemonDetails.types[0].type.name
            )}`,
          }}
        />
        <Typography.Title level={3}>
          #{padNumber(id as string, 3)}
        </Typography.Title>
        {pokemonDetails.types.map((v: any) => (
          <Tag>{formatName(v.type.name)}</Tag>
        ))}
        <Tabs defaultActiveKey="1" items={items} centered />
      </Card>
    </div>
  );
}
