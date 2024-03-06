import React from 'react'
import { Button, Card, Title } from "@mantine/core";
import CompanyForm from "../_components/form";
import { api } from '@/utils/api'
import NextLink from 'next/link'
import { FaAngleLeft } from "react-icons/fa"
import NextHead from 'next/head'

interface PageProps {
  id: number
}

function UserCreate(props: PageProps): React.ReactElement {
  const { data } = api.user.show.useQuery(Number(props.id));

  return (
    <>
        <NextHead>
            <title>User Edit Page</title>
        </NextHead>
        <main className="flex flex-col m-12">
            <div className="container m-auto">
            <NextLink href="/user/list">
                <Button variant="default" color="dark" size="xs" leftIcon={<FaAngleLeft size="1rem" />} className="mb-4">Back</Button>
            </NextLink>
            <Card withBorder shadow="sm" radius="sm">
                {/* Card Header */}
                <Card.Section withBorder px="xl" py="sm">
                <Title order={3} size="text-base" weight="bold" align="left">
                    Edit User
                </Title>
                </Card.Section>

                {/* Card Body */}
                <Card.Section px="xl" py="md">
                <CompanyForm data={data} />
                </Card.Section>
            </Card>
            </div>
        </main>
    </>
  )
}

export default UserCreate;