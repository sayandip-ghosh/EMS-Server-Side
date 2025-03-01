const asyncHandler = (requestHandler) => //higher order function takes a function as an argument and returns a function
    {
        return (req, res, next) => {
            Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
        }
    }



export default asyncHandler;