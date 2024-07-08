// https://github.com/vercel/swr/releases/tag/2.0.0-beta.0
// https://swr.vercel.app/docs/mutation#useswrmutation-basic-usage

import useSWRMutation from 'swr/mutation'

export type PostMessageBody = {
    text: string
}

export default function usePostMessage() {
    const sendRequest = async (
        url: string,
        { arg }: { arg: PostMessageBody },
    ) => {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(arg),
        })
    }

    const { trigger } = useSWRMutation('/api/message', sendRequest)
    return trigger
}
