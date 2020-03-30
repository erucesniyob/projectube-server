const graphql = require('graphql');
// const _ = require('lodash');
const User = require('../models/users');
const Org = require('../models/organizations');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLScalarType,
  GraphQLNonNull
} = graphql;

// Defining 2 types
const OrgType = new GraphQLObjectType({
  name: 'Organizationz',
  fields: () => ({
    name: {type: GraphQLString},
    contact: {type: new GraphQLObjectType({
      name: 'org_contact',
      fields: () => ({
        email: {type: GraphQLString},
        phoneNum: {type: GraphQLString},
        fbLink: {type: GraphQLString}
      })
    })
    },
    category: {type: new GraphQLList(GraphQLString)},
    description: {type: GraphQLString},
    img: {type: GraphQLString},
    recruit: {type: new GraphQLObjectType({
      name: 'org_recrt',
      fields: () => ({
        jobDes: {type: GraphQLString},
        deadline: {type: GraphQLString},
        formLink: {type: GraphQLString}
      })   
    })
    }
  })
});

const UserType = new GraphQLObjectType({
  name:'My_Users',
  fields: () => ({
    name: {type: GraphQLString},
    DOB: {type: GraphQLString},
    ava: {type: GraphQLString},
    bio: {type: GraphQLString},
    personalPref: {type: GraphQLString}
  })
});


// Root Query
const RootQuery = new GraphQLObjectType({
  name:'The_Root',
  fields: {
    user: {
      type: UserType,
      args: {name: {type: GraphQLString}},
      resolve(parent, args){
        return User.find({name: args.name})
      }
    },
    org: {
      type: OrgType,
      args: {name: {type: GraphQLString}},
      resolve(parent, args){
        return Org.find({name: args.name})
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.find({})
      }
    },
    orgs: {
      type: new GraphQLList(OrgType),
      resolve(parent, args){
        return Org.find({})
      }
    }
  }
});


// Mutation
const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields: {
    addOrg: {
      type: OrgType,
      args: {
        name: {type: GraphQLString},
        contact: {type: new GraphQLInputObjectType({
          name: 'mu_contact',
          fields: () => ({
            email: {type: GraphQLString},
            phoneNum: {type: GraphQLString},
            fbLink: {type: GraphQLString}
          })
        })
        },
        category: {type: new GraphQLList(GraphQLString)},
        description: {type: GraphQLString},
        img: {type: GraphQLString},
        recruit: {type: new GraphQLInputObjectType({
          name:'mu_recrt',
          fields: () => ({
            jobDes: {type: GraphQLString},
            deadline: {type: GraphQLString},
            formLink: {type: GraphQLString}
          })
        })
        }
      },
      resolve(parent, args){
        let org = new Org({
          name: args.name,
          contact: {
            email: args.contact.email,
            phoneNum: args.contact.phoneNum,
            fbLink: args.contact.fbLink
          },
          category: args.category,
          description: args.description,
          img: args.img,
          recruit: {
            jobDes: args.recruit.jobDes,
            deadline: Date.parse(args.recruit.deadline),
            formLink: args.recruit.formLink
          }
        });
        return org.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: {type: GraphQLString},
        DOB: {type: GraphQLString},
        ava: {type: GraphQLString},
        bio: {type: GraphQLString},
        personalPref: {type: GraphQLString}
      },
      resolve(parent, args){
        let user = new User({
          name: args.name,
          DOB: Date.parse(args.DOB),
          ava: args.ava,
          bio: args.bio,
          personalPref: args.personalPref
        });
        return user.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
