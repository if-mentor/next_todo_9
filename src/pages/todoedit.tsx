import React from 'react'
import {Box,Heading,Button,Text} from '@chakra-ui/react'

function TodoEdit() {
  return (
    <Box width='900px' fontWeight='bold'>
      <Box backgroundColor='#95E3F4' >
        <Heading padding='10px 80px'>TODO</Heading>
      </Box>
      
      <Box padding='10px 80px' width='800px'>
        <Box display='flex' justifyContent='space-between'>
          <Text>EDIT TODO</Text>
          <Button backgroundColor='#95E3F4' size='xs' padding='0 20px' border='1px solid' borderRadius='15px' width='70px'>Back</Button>
        </Box>
        
        <Text>TITLE</Text>
        <Text fontSize='xs' border='solid 1px black' borderRadius='5px' padding='10px'>Github上に静的サイトをホスティングする</Text>
        <Text>DETAIL</Text>
        <Text fontSize='xs' border='solid 1px black' borderRadius='5px' padding='10px'>AWS コンソールで AWS Amplify を使って静的ウェブサイトをホスティングします。AWS Amplify は、静的ウェブサイトおよびウェブアプリにフルマネージドのホスティングを提供します。Amplify のホスティングソリューションは、Amazon CloudFront と Amazon S3 を使って、AWS コンテンツ配信ネットワーク (CDN) を介してサイトアセットを提供します。<br />
継続的デプロイをセットアップします。Amplify は、継続的デプロイで Git ベースのワークフローを提供します。それにより、コードコミットごとに、サイトに自動的に更新をデプロイすることができます。<br /><br /><br /><br /><br /></Text>

        <Box display='flex' justifyContent='space-between' padding='15px 0'>
          <Box display='flex' justifyContent='space-between'>
            <Box>
            <Text fontSize='xs'>Create</Text>
            <Text>2020-11-8 18:55</Text>
            </Box>

            <Box margin='0 30px'>
            <Text fontSize='xs'>Update</Text>
            <Text>2020-11-8 18:55</Text>
            </Box>
          
          </Box>
          
          <Button backgroundColor='#95E3F4' size='xs' padding='0 20px' border='1px solid' borderRadius='15px' width='70px'>UPDATE</Button>
        </Box>
        
      </Box>
      
    </Box>
  )
}

export default TodoEdit