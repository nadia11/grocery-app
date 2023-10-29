import sanityClient from './sanity';
let sanityQuery = (query, params)=> sanityClient.fetch(query, params);

export const getFeaturedResturants = ()=>{
    return sanityQuery(`
        *[_type == 'featured'] {
            ...,
            restaurants[]->{
         ...,dishes[]->{
            ...
         }
            }
        }
    `);
}

export const getCategories = ()=>{
    return sanityQuery(`
        *[_type == 'category']
    `);
}

export const getFeaturedResturantById = id=>{
    return sanityQuery(`
        *[_type == 'featured' && _id == $id] {
            ...,
            resturants[]->{
                ...,
                dishes[]->{...},
                type->{
                    name
                }
            }
        }[0]
    `, {id})
}

export const getFeaturedRestaurantByName=name=>{
    return sanityQuery(`
    *[_type == 'featured' && name == $name] {
            ...,
            resturants[]->{
                ...,
                dishes[]->{...},
                type->{
                    name
                }
            }
        }[0]`)
}
export const searchFeaturedRestaurantrs=name=>{
    return sanityQuery(`
     *[_type == 'dish' && name match `*$name*`] {
            ...,
            resturants[]->{
                ...,
                dishes[]->{...},
                type->{
                    name
                }
            }
        }`)
}