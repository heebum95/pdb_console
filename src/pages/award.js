import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AwardListResults } from '../components/award/award-list.results';
import { AwardToolbar } from '../components/award/award-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';


const Page = () => (
  <>
    <Head>
      <title>
        PDB Award
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
        <AwardToolbar />
        <Box sx={{ mt: 3 }}>
          <AwardListResults />
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
