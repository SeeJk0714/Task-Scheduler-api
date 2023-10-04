import { useState } from "react";
import axios from "axios";
import {
    Container,
    Title,
    Space,
    Card,
    TextInput,
    Button,
    Group,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";

const addCategory = async (data) => {
    const response = await axios({
        method: "POST",
        url: "http://localhost:4000/categories",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });
    return response.data;
};

function CategoryAdd() {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const createMutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            notifications.show({
                title: "Category Added",
                color: "green",
            });
            navigate("/");
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    const handleAddNewCategory = async (event) => {
        event.preventDefault();
        createMutation.mutate(
            JSON.stringify({
                name: name,
            })
        );
    };

    return (
        <Container>
            <Space h="50px" />
            <Title order={2} align="center">
                Add New Category
            </Title>
            <Space h="50px" />
            <Card withBorder shadow="md" p="20px">
                <TextInput
                    value={name}
                    placeholder="Enter the shop name here"
                    label="Name"
                    description="The name of the shop"
                    withAsterisk
                    onChange={(event) => setName(event.target.value)}
                />
                <Space h="20px" />
                <Button fullWidth onClick={handleAddNewCategory}>
                    Add New Category
                </Button>
            </Card>
            <Space h="20px" />
            <Group position="center">
                <Button
                    component={Link}
                    to="/"
                    variant="subtle"
                    size="xs"
                    color="gray"
                >
                    Go back to Home
                </Button>
            </Group>
            <Space h="100px" />
        </Container>
    );
}
export default CategoryAdd;
