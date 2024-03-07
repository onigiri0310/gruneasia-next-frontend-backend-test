import { Button, Card, Title } from "@mantine/core"
import { type NextPage } from "next"
import CompanyForm from "../_components/form"
import NextLink from 'next/link'
import { FaAngleLeft } from "react-icons/fa"
import NextHead from 'next/head'

const CompanyCreate: NextPage = () => {
  return (
    <>
      <NextHead>
        <title>Company Create Page</title>
      </NextHead>
      <main className="flex flex-col m-12">
        <div className="container m-auto">
          <NextLink href="/user/list">
              <Button variant="default" color="dark" size="xs" leftIcon={<FaAngleLeft size="1rem" />} className="mb-4">Back</Button>
          </NextLink>
          <Card withBorder shadow="sm" radius="sm" >
            {/* Card Header */}
            <Card.Section withBorder px="xl" py="sm">
              <Title order={3} size="text-base" weight="bold" align="left">
                Create Company
              </Title>
            </Card.Section>

            {/* Card Body */}
            <Card.Section px="xl" py="md">
              <CompanyForm />
            </Card.Section>
          </Card>
        </div>
      </main>
    </>
  );
};

export default CompanyCreate;