import React from 'react'
import {Box,Button,Text,Flex,Spacer} from '@chakra-ui/react'
import Layout from '@/components/Layout'
import styled from '@emotion/styled'

function TodoEdit() {
  return (
    <>
    <Layout>
      <Container>
        <Flex mb='10px'>
          <Box fontSize='lg'>EDIT TODO</Box>
          <Spacer/>
          <Button 
            bg='#95e3f4'
            size='xs'
            p = '0 20px'
            border='1px solid black'
            borderRadius='15px'
            w='70px'
          >
            Back
          </Button>
        </Flex>

        <Text>TITLE</Text>
        <Text 
          fontSize='sm'
          border='solid 1px black'
          borderRadius='5px'
          p='10px'
          mb='10px'
        >
          Github上に静的サイトをホスティングする
        </Text>

        <Text>DETAIL</Text>
        <Text 
          fontSize='sm'
          border='solid 1px black'
          borderRadius='5px'
          p='10px'
          mb='15px'
        >
          &nbsp;&nbsp;&nbsp;&nbsp;AWS コンソールで AWS Amplify を使って静的ウェブサイトをホスティングします。AWS Amplify は、静的ウェブサイトおよびウェブアプリにフルマネージドのホスティングを提供します。Amplify のホスティングソリューションは、Amazon CloudFront と Amazon S3 を使って、AWS コンテンツ配信ネットワーク (CDN) を介してサイトアセットを提供します。<br />継続的デプロイをセットアップします。Amplify は、継続的デプロイで Git ベースのワークフローを提供します。それにより、コードコミットごとに、サイトに自動的に更新をデプロイすることができます。<br /><br /><br /><br /><br />
        </Text>

        <Flex>
        <Box>
          <Text fontSize='xs'>Create</Text>
          <Text fontSize='sm'>2020-11-8 18:55</Text>
        </Box>
        <Box margin='0 30px'>
          <Text fontSize='xs'>Update</Text>
          <Text fontSize='sm'>2020-11-8 18:55</Text>
        </Box>
        <Spacer/>
        <Button 
            bg='#95e3f4'
            size='xs'
            p = '0 20px'
            border='1px solid black'
            borderRadius='15px'
            color='White'
            w='70px'
          >
            UPDATE
          </Button>
        </Flex>
      </Container>
    </Layout>
    </>

  )
}

export default TodoEdit;

const Container = styled.div`
  font-weight : bold;
  padding : 20px 0 ;
  margin: 0 auto;
  width:100%; 
  min-width:150px; 
  max-width:1080px;
`;
