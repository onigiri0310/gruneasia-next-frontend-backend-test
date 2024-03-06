import type { UseFormReturnType } from '@mantine/form'
import { api } from '@/utils/api'

import type { CheckUsername } from '@/types/api/commons'
import type {User} from '@/types/api/models'

export function useUsername(form: UseFormReturnType<User>) {
    const checkUserMutation = api.user.checkUsername.useMutation();

    const checkUsername = async (userData: CheckUsername) => {
        try {
            const username = await checkUserMutation.mutateAsync(userData)

            if (username && username.exist) {
                form.setFieldError('username', 'Username already exist')
            } else {
                form.validateField('username')
            }
        } catch (error) {
            console.error(error)
            form.validateField('username')
        }
    }

    return { checkUsername }
}
