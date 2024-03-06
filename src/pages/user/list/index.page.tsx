import { Button, Card, Center, Table, Text } from "@mantine/core";
import { type NextPage } from "next";
import NextLink from 'next/link'
import { AiFillEdit } from 'react-icons/ai'
import NextHead from 'next/head'

import { api } from "@/utils/api";
import DeleteConfirmModal from "../_components/deleteButton";
import dayjs from 'dayjs'

const UserCreate: NextPage = () => {
    const {data, refetch} = api.user.get.useQuery();

    const dateFormat = (date: Date) => {
        return dayjs(date).format('YYYY/MM/DD H:mm:ss')
    }

    const onDeleted = async () => {
        await refetch();
    }
  
    const ths = (
        <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Register Date</th>
            <th>Update Date</th>
            <th></th>
        </tr>
    );
  
    const rows = data?.map((el, index: number) => (
      <tr key={index}>
        <td>{el.name ?? ''}</td>
        <td>{el.username}</td>
        <td>{el.email}</td>
        <td>{el.age}</td>
        <td>{el.gender === 1 ? 'Male' : el.gender === 2 ? 'Female' : ''}</td>
        <td>{dateFormat(el.createdAt)}</td>
        <td>{dateFormat(el.updatedAt)}</td>
        <td>
        <Center>
        <NextLink href={`/user/${el.id}/edit`}>
            <Button
            size="xs"
            variant="outline"
            className="min-w-[5rem] max-w-[5rem]"
            compact leftIcon={<AiFillEdit size={14} />}>
                Edit
            </Button>
        </NextLink>
          <DeleteConfirmModal id={el.id} onDeleted={onDeleted} />
        </Center>
        </td>
      </tr>
    ))


  return (
    <>
        <NextHead>
            <title>User List Page</title>
        </NextHead>
        <main className="flex flex-col m-12">
            <div className="container m-auto">
                <NextLink href="/user/create">
                    <Button className="mb-4">Add User</Button>
                </NextLink>
                <Card withBorder shadow="sm" radius="sm">
                    {/* Card Body */}
                    <Card.Section inheritPadding py="md">
                    <Table>
                        <thead>{ths}</thead>
                        <tbody>{rows?.length && rows.length > 0 ? (
                    rows
                    ) : (
                    <tr>
                        <td colSpan={Number(4)}>
                        <Text
                            weight={500}
                            align="center"
                            style={{ minWidth: '1175px' }}
                        >
                            No Data
                        </Text>
                        </td>
                    </tr>
                    )}</tbody>
                    </Table>
                    </Card.Section>
                </Card>
            </div>
        </main>
    </>
  );
};

export default UserCreate;