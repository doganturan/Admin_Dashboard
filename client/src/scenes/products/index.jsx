import React, { useState } from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery, CircularProgress } from '@mui/material'
import { useGetProductsQuery } from 'state/api'
import Header from "components/Header"
import { ArrowDropDown, ArrowDropDownCircle, ArrowRight } from '@mui/icons-material'


const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card sx={{ backgroundImage: 'none', backgroundColor: theme.palette.background.alt, borderRadius: '0.55rem' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant='h5' component={'div'}>
                    {name}
                </Typography>
                <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography variant='body2' >
                    {description}
                </Typography>

                <CardActions sx={{ marginTop: '25px', padding: 0 }}>
                    <Button variant='contained' size='small' onClick={() => setIsExpanded(!isExpanded)}>
                        See More {!isExpanded ? <ArrowRight sx={{ fontSize: '25px' }} /> : <ArrowDropDown sx={{ fontSize: '25px' }} />}
                    </Button>
                </CardActions>
                <Collapse in={isExpanded} timeout={'auto'} unmountOnExit sx={{ color: theme.palette.neutral[300] }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px', marginTop: '1rem'}}>
                        <Typography><span style={{ fontWeight: '700', color: 'lightgray' }}> Id:</span> {_id} </Typography>
                        <Typography><span style={{ fontWeight: '700', color: 'lightgray'}}> Supply Left:</span>  {supply} </Typography>
                        <Typography><span style={{ fontWeight: '700', color: 'lightgray' }}>Yearly Sales:</span>   {stat.yearlySalesTotal} </Typography>
                        <Typography><span style={{ fontWeight: '700', color: 'lightgray' }}>Yearly Sales This Year:</span>   {stat.yearlyTotalSoldUnits} </Typography>
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card >
    )
}

const Products = () => {

    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    return (
        <Box m={'1.5rem 2.5rem'}>
            <Header title={'Products'} subtitle={"See your list of products."} />
            {data || !isLoading ? (
                <Box mt={'20px'} display={'grid'} gridTemplateColumns={'repeat(3, minmax(0, 1fr))'} justifyContent={'space-between'} rowGap={'20px'} columnGap={'1.33%'} sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}>
                    {data.map(({ _id, name, description, price, rating, category, supply, stat }) => (
                        <Product key={_id} _id={_id} name={name} description={description} price={price} rating={rating} category={category} supply={supply} stat={stat} />)
                    )}
                </Box>

            ) :
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
        </Box>
    )
}

export default Products