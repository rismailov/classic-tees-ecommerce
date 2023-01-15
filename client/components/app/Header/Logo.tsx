import { Title } from "@mantine/core";

export const Logo = () => {
    return (
        <Title order={4}>{process.env.NEXT_PUBLIC_APP_NAME}</Title>
    );
};
