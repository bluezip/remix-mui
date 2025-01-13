import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/server-runtime'
import Layout from '~/components/layouts/layouts'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log(params)
  return json({
    id: params.id,
  })
}

export default function TemporaryDrawer() {
  const { id } = useLoaderData<typeof loader>()
  console.log(id)
  return (
    <div>
      <Layout>สร้างเอกสาร 2 {id}</Layout>
    </div>
  )
}
