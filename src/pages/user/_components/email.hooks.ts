import type { UseFormReturnType } from '@mantine/form'
import { api } from '@/utils/api'

import type { CheckEmail } from '@/types/api/commons'
import type { User } from '@/types/api/models'

export function useEmail(form: UseFormReturnType<User>) {
    const checkEmailMutation = api.user.checkEmail.useMutation();

    const checkEmail = async (mailData: CheckEmail) => {
        try {
            const email = await checkEmailMutation.mutateAsync(mailData)

            if (email && email.exist) {
                form.setFieldError('email', 'Email already exist')
            } else {
                form.validateField('email')
            }
        } catch (error) {
            console.error(error)
            form.validateField('email')
            }
    }

    return { checkEmail }
}
