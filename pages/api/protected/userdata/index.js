export default async function handler(req, res) {
    //   await dbConnect()
      switch (req.method) {
        case 'GET':
          try {
            res.status(200).json({msg:"helloooo"})
            // const newPost = new Post(req.body)
            // newPost.save()
            // res.status(201).json({ success: true, data: "post Added successfully" })
          } catch (error) {
            res.status(400).json({ success: false, error})
          }
          break
        default:
          res.status(400).json({ success: false,msg:`Cannot Find ${req.method}` })
      }
    }