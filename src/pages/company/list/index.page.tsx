import { Button, Card, Center, Table, Text } from "@mantine/core";
import { type NextPage } from "next";
import NextLink from 'next/link';
import { AiFillEdit } from 'react-icons/ai';
import NextHead from 'next/head';
import { api } from "@/utils/api";
import DeleteConfirmModal from "../_components/deleteButton";
import dayjs from 'dayjs';

// Company情報の型定義
interface CompanyData {
    id: number;
    name: string;
    email: string;
    postcode: number;
    prefecture: string;
    city: string;
    local: string;
    streetAddress: string;
    businessHour: string;
    regularHoliday: string;
    phone: string;
    fax: string;
    url: string;
    licenseNumber: string;
}

const CompanyCreate: NextPage = () => {
    const { data, refetch } = api.company.get.useQuery();

    const dateFormat = (date: Date) => {
        return dayjs(date).format('YYYY/MM/DD H:mm:ss')
    }

    const onDeleted = async () => {
        await refetch();
    }

    const ths = (
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Postcode</th>
            <th>Prefecture</th>
            <th>City</th>
            <th>Local</th>
            <th>Street Address</th>
            <th>Business Hour</th>
            <th>Regular Holiday</th>
            <th>Phone</th>
            <th>Fax</th>
            <th>URL</th>
            <th>License Number</th>
            <th></th>
        </tr>
    );

    const rows = data?.map((company: CompanyData, index: number) => (
        <tr key={index}>
            <td>{company.name}</td>
            <td>{company.email}</td>
            <td>{company.postcode}</td>
            <td>{company.prefecture}</td>
            <td>{company.city}</td>
            <td>{company.local}</td>
            <td>{company.streetAddress}</td>
            <td>{company.businessHour}</td>
            <td>{company.regularHoliday}</td>
            <td>{company.phone}</td>
            <td>{company.fax}</td>
            <td>{company.url}</td>
            <td>{company.licenseNumber}</td>
            <td>
                <Center>
                    <NextLink href={`/company/${company.id}/edit`}>
                        <Button
                            size="xs"
                            variant="outline"
                            className="min-w-[5rem] max-w-[5rem]"
                            compact leftIcon={<AiFillEdit size={14} />}>
                            Edit
                        </Button>
                    </NextLink>
                    <DeleteConfirmModal id={company.id} onDeleted={onDeleted} />
                </Center>
            </td>
        </tr>
    ))

    return (
        <>
            <NextHead>
                <title>Company List Page</title>
            </NextHead>
            <main className="flex flex-col m-12">
                <div className="container m-auto">
                    <NextLink href="/company/create">
                        <Button className="mb-4">Add Company</Button>
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
                                        <td colSpan={14}>
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

export default CompanyCreate;
