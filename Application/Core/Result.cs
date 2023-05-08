using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    // [Handling API Error responses] [step 1]
    // Use a generic Result class to wrap the result
    public class Result<T>
    {
        public bool IsSuccess { get; set; }

        public T Value { get; set; }

        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};

        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};
    }
}