export const getServerSideProps = (
    context: { query: { id: number } }
  ) => {
  // Get the query parameter from the context object
  const id = context.query.id

  // Return the query parameter as props to the component
  return {
    props: {
      id,
      pageTitle: '会員編集',
    },
  }
}