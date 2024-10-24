import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Layout from '@/components/Layout';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else {
    errorMessage = (error as Error)?.message;
  }

  return (
    <Layout>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </Layout>
  );
}
