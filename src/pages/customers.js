import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/person/person-list-results';
import { CustomerListToolbar } from '../components/person/person-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { person } from '../__mocks__/person';

const Page = () => (
  <>
    <Head>
      <title>
        Customers | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults person={person} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
