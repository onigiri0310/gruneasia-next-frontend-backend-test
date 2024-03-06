import { api } from '@/utils/api'
import { Button, Center, Grid, Group, NumberInput, Radio, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import {UserSchema, type User} from '@/types/api/models'
import type {CheckEmail, CheckUsername} from '@/types/api/commons'
import {useEmail} from '@/pages/user/_components/email.hooks'
import {useUsername} from '@/pages/user/_components/username.hooks'
interface PageProps {
  data?: User | null | undefined
}

export default function CompanyForm(params: PageProps) {
  const router = useRouter()
  const updateUserMutation = api.user.update.useMutation();
  const createUserMutation = api.user.create.useMutation();

  const form = useForm<User>({
    validateInputOnChange: true,
    initialValues: {
      name: params.data?.name ?? '',
      username: params.data?.username ?? '',
      email: params.data?.email ?? '',
      age: params.data?.age ?? undefined,
      gender: params.data?.gender ?? undefined,
    },

    validate: zodResolver(UserSchema),
    transformValues: (values) => ({
      ...values,
      id: params.data?.id ?? undefined,
    }),
  })

  const emailData: CheckEmail = {
    email: form.values.email,
    ...(params.data?.email && {exclude: params.data?.email}),
  }

  const usernameData: CheckUsername = {
    username: form.values.username,
    ...(params.data?.username && {exclude: params.data?.username}),
  }

  const { checkEmail } = useEmail(form)
  const { checkUsername } = useUsername(form)

  useEffect(() => {
    if (params.data) {
      form.setValues(params.data)
    }
  }, [params.data])

  async function onSubmit(values: User) {
    await checkUsername(usernameData)
    await checkEmail(emailData)
    
    if (Object.keys(form.errors).length === 0) {
      try {
        if (params.data) {
          await updateUserMutation.mutateAsync(values)
        } else {
          await createUserMutation.mutateAsync(values)
        }

        showNotification({
          title: 'Success',
          message: `Data updated successfully`,
          color: 'green',
          icon: <FiCheck size={16} />,
        })

        await router.push('/user/list')
      } catch (error) {
        // Handle error
        console.error(error)
        showNotification({
          title: 'Error',
          message: `Data updated failed`,
          color: 'red',
          icon: <FiX size={16} />,
        })
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => void onSubmit(values))}>
      <Grid gutterXs="sm" gutterMd="xl">
        <Grid.Col sm={6} xs={12} className="space-y-2">
          <TextInput label="Username" 
            withAsterisk 
            {...form.getInputProps('username')}
            onBlur={() => void checkUsername(usernameData)}  
          />
          <TextInput label="Name" {...form.getInputProps('name')} />
          <TextInput 
            label="Email" 
            withAsterisk 
            {...form.getInputProps('email')}
            onBlur={() => void checkEmail(emailData)}
          />
        </Grid.Col>
        <Grid.Col sm={6} xs={12} className="space-y-2">
          <NumberInput label="Age" 
            max={120}
            min={0}
            {...form.getInputProps('age')} 
            value={form.values.age ?? undefined}
          />
          <Radio.Group
            label="Gender"
            {...form.getInputProps('gender')}
            value={form.values.gender?.toString()}
            onChange={(e) => form.setFieldValue('gender', Number(e))}
          >
            <Group>
              <Radio value="1" label="Male" />
              <Radio value="2" label="Female" />
            </Group>
          </Radio.Group>
        </Grid.Col>
      </Grid>
      <Center mt={20}>
        <Button type="submit">{params.data ? 'Save' : 'Register'}</Button>
      </Center>
    </form>
  )
}
