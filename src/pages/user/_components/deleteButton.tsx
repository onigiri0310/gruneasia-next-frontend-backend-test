import { Modal, Group, Button, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { BsFillTrashFill } from 'react-icons/bs'
import { api } from '@/utils/api'
import { useDisclosure } from '@mantine/hooks'
import { FiCheck, FiX } from 'react-icons/fi'

interface PageProps {
  title?: string
  id: string
  onDeleted: () => Promise<void>
}
const DeleteConfirmModal = (props: PageProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const deleteUserMutation = api.user.delete.useMutation();

  const confirmDelete = async (id: string) => {
    const response = await deleteUserMutation.mutateAsync(id)
    
    if (response && response.id) {
      close()
      await props.onDeleted()

      showNotification({
        title: 'Success',
        message: `Success deleted user`,
        color: 'green',
        icon: <FiCheck size={16} />,
      })
    }
    else {
      console.error(response)
      showNotification({
        title: 'Failed',
        message: `Failed deleted user`,
        color: 'red',
        icon: <FiX size={16} />,
      })
    }
  }

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Delete data">
        <Text size="sm">Are you sure you want to delete this data?</Text>

        <Group position="center" mt={20}>
          <Button
            size="xs"
            color="red"
            className="min-w-[5rem]"
            style={{ fontSize: 12 }}
            onClick={() => void confirmDelete(props.id)}
          >
            Delete
          </Button>
          <Button
            size="xs"
            variant="outline"
            color="gray"
            className="min-w-[5rem]"
            style={{ fontSize: 12 }}
            onClick={close}
          >
            Cancel
          </Button>
        </Group>
      </Modal>

        <Button
            size="xs"
            variant="outline"
            color="red"
            ml={5}
            className="min-w-[5rem] max-w-[5rem]"
            onClick={open}
            compact leftIcon={<BsFillTrashFill size={14} />}>
            Delete
        </Button>
    </div>
  )
}

export default DeleteConfirmModal
