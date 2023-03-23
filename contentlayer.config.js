
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

/*
This configuration specifies a document type called Post. 
These documents are expected to be .md files that live within a 
posts directory in your project. 

data objects generated from these files will have the following properties:
    title: String pulled from the file's frontmatter.

    body: An object that contains the raw content from the markdown 
    file and the converted html string. (This is built into Contentlayer 
    by default and does not have to be defined.)

    url: A string that takes the name of the file (without the extension) 
    and prepends /posts/ to it, thus defining that path at which that 
    content will be available on your site. (More on this soon.)
*/

/*
defineDocumentType defines the schema for one particular document type, 
often referred to as a model or content type. Document type definitions 
are used within the options for makeSource, which is how the definition 
is passed onto Contentlayer.
*/
export const Post = defineDocumentType(() => ({
  name: 'Post',
  /*
  name (required) is set to 'Post' here. this will generate a data object
  allPosts representing the collection of all matching 
  documents (see filePathPattern).
  */

  filePathPattern: `**/posts/*.md`,
  /*
  This is for selecting the specific set of md files that you are targeting 
  with this document type. Path is relative to the contentDirPath specified 
  in the makeSource options. Use glob patterns to target a specific subset 
  of documents.  

  We want to target the md files in the content/posts directory. 

  The double asterisks are placeholders or instructions to the recursive 
  interpreter to go through the files and folders. One asterisk means 
  select all without recursion (only in directory).
  */
    
  fields: {
    /*
    Field definitions determine the data shape for the document type. This one 
    will be an object with three key:value pairs, title, date, and body. 
    */
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    /*
     Each field here takes a required resolve option, which is a function that 
     resolves the value of the field. The function receives a single argument, 
     the document object.

    In this example, a url property is added to the document object. The 
    property is calculated on the fly. 

    */
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}))

export const Article = defineDocumentType(() => ({
    name: 'Article',
    filePathPattern: `**/articles/*.md`,
    fields: {
      title: {
        type: 'string',
        description: 'The title of the article',
        required: true,
      },
      date: {
        type: 'date',
        description: 'The date of the article',
        required: true,
      },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (article) => `/${article._raw.flattenedPath}`,
      },
    },
}))

export default makeSource({
  contentDirPath: 'content',
  // contentDirPath(required): Path to where the content lives, 
  // relative to the root of your project.
  documentTypes: [Post, Article],
  // documentTypes (required): Your schema definitions for your project. See 
  // defineDocumentType.
})