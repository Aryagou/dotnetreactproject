using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetailsQuery : IRequest<Result<Activity>>
    {
        public Guid Id { get; set; }
    }

    public class GetActivityDetailsQueryHandler : IRequestHandler<GetActivityDetailsQuery, Result<Activity>>
    {
        private readonly DataContext _context;

        public GetActivityDetailsQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Activity>> Handle(GetActivityDetailsQuery request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);

            // [Handling API Error responses] [step 2]
            // Use the static method in Result class to wrap the result and pass it back to controller 
            return Result<Activity>.Success(activity);
        }
    }
}