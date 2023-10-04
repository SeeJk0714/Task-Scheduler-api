import { Link } from "react-router-dom";
import axios from "axios";
import { Title, Grid, Group, Space, Button } from "@mantine/core";
import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const fetchCategory = async () => {
    const response = await axios.get("http://localhost:4000/categories");
    return response.data;
};

export default function Categorys() {
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategory(),
    });

    return (
        <>
            <Space h="20px" />{" "}
            <Group position="apart">
                <Title order={3} align="center">
                    Item
                </Title>
                <Button
                    component={Link}
                    to="/add_category"
                    variant="gradient"
                    gradient={{ from: "yellow", to: "purple", deg: 105 }}
                >
                    Add New Category
                </Button>
            </Group>
            <Space h="20px" />
            <Grid>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    {categories ? (
                        categories.map((cate) => {
                            return (
                                <tbody>
                                    <tr key={cate._id}>
                                        <td>{cate.name}</td>
                                    </tr>
                                </tbody>
                            );
                        })
                    ) : (
                        <Grid.Col className="mt-5">
                            <Space h="120px" />
                            <h1 className="text-center text-muted">
                                No Category yet .
                            </h1>
                        </Grid.Col>
                    )}
                </Table>
            </Grid>
        </>
    );
}
