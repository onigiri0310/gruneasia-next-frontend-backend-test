import { api } from "@/utils/api";
import { Button, Center, Grid, Select, Textarea, TextInput } from "@mantine/core";
import { type NextPage } from "next";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { CompanySchema, type Company } from "@/types/api/models";
import { useEmail } from "@/pages/user/_components/email.hooks";
import { showNotification } from "@mantine/notifications";

interface PageProps {
  data?: Company | null | undefined;
}

const CompanyForm: NextPage<PageProps> = (params) => {
  const router = useRouter();
  const updateCompanyMutation = api.company.update.useMutation();
  const createCompanyMutation = api.company.create.useMutation();

  const form = useForm<Company>({
    validateInputOnChange: true,
    initialValues: {
      name: params.data?.name ?? "",
      email: params.data?.email ?? "",
      postcode: params.data?.postcode ?? "",
      prefectureId: params.data?.prefectureId ?? "",
      city: params.data?.city ?? "",
      local: params.data?.local ?? "",
      streetAddress: params.data?.streetAddress ?? "",
      businessHour: params.data?.businessHour ?? "",
      regularHoliday: params.data?.regularHoliday ?? "",
      phone: params.data?.phone ?? "",
      fax: params.data?.fax ?? "",
      url: params.data?.url ?? "",
      licenseNumber: params.data?.licenseNumber ?? "",
    },
    validate: zodResolver(CompanySchema),
    transformValues: (values) => ({
      ...values,
      id: params.data?.id ?? undefined,
    }),
  });

  const emailData = {
    email: form.values.email,
    ...(params.data?.email && { exclude: params.data?.email }),
  };

  const { checkEmail } = useEmail(form);

  useEffect(() => {
    if (params.data) {
      form.setValues(params.data);
    }
  }, [params.data]);

  async function onSubmit(values: Company) {
    await checkEmail(emailData);

    if (Object.keys(form.errors).length === 0) {
      try {
        if (params.data) {
          await updateCompanyMutation.mutateAsync(values);
        } else {
          await createCompanyMutation.mutateAsync(values);
        }

        showNotification({
          title: "Success",
          message: `Data updated successfully`,
          color: "green",
          icon: <FiCheck size={16} />,
        });

        await router.push("/company/list");
      } catch (error) {
        // Handle error
        console.error(error);
        showNotification({
          title: "Error",
          message: `Data updated failed`,
          color: "red",
          icon: <FiX size={16} />,
        });
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => void onSubmit(values))}>
      <Grid gutterXs="sm" gutterMd="xl">
        <Grid.Col sm={6} xs={12} className="space-y-2">
          <TextInput label="Name" withAsterisk {...form.getInputProps("name")} maxLength={50} />
          <TextInput
            label="Email"
            withAsterisk
            {...form.getInputProps("email")}
            onBlur={() => void checkEmail(emailData)}
            maxLength={255}
          />
          <TextInput
            label="Postcode"
            withAsterisk
            {...form.getInputProps("postcode")}
            maxLength={7}
          />
          <Select
            label="Prefecture"
            withAsterisk
            data={[
              { value: "prefectureId1", label: "Prefecture 1" },
              { value: "prefectureId2", label: "Prefecture 2" },
              // Add options for prefectures here
            ]}
            {...form.getInputProps("prefectureId")}
          />
          <TextInput label="City" withAsterisk {...form.getInputProps("city")} maxLength={255} />
          <TextInput label="Local" withAsterisk {...form.getInputProps("local")} maxLength={255} />
          <TextInput label="Street Address" {...form.getInputProps("streetAddress")} maxLength={255} />
        </Grid.Col>
        <Grid.Col sm={6} xs={12} className="space-y-2">
          <Textarea
            label="Business Hour"
            {...form.getInputProps("businessHour")}
            maxLength={255}
          />
          <Textarea
            label="Regular Holiday"
            {...form.getInputProps("regularHoliday")}
            maxLength={255}
          />
          <TextInput
            label="Phone"
            {...form.getInputProps("phone")}
            type="tel"
            pattern="[0-9]*"
            maxLength={50}
          />
          <TextInput label="Fax" {...form.getInputProps("fax")} maxLength={50} />
          <TextInput label="URL" {...form.getInputProps("url")} maxLength={255} />
          <TextInput label="License Number" {...form.getInputProps("licenseNumber")} maxLength={50} />
        </Grid.Col>
      </Grid>
      <Center mt={20}>
        <Button type="submit">{params.data ? "Save" : "Register"}</Button>
      </Center>
    </form>
  );
};

export default CompanyForm;
