export const TryCatch = async (func)=>{
  try {
    func()
  } catch (error) {
    console.error(error)
  }

}