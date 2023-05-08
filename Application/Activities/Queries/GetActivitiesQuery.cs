using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{

    public class GetActivitiesQuery : IRequest<Result<List<Activity>>> { }

    public class GetActivitiesQueryHandler : IRequestHandler<GetActivitiesQuery, Result<List<Activity>>>
    {
        private readonly DataContext _context;

        public GetActivitiesQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Activity>>> Handle(GetActivitiesQuery request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync();
            // use LINQ OderByDescending. Have to use ToList to convert IOrderedEnumerable to list
            var sortedActivities = activities.OrderByDescending(activity => activity.Date).ToList();
            return Result<List<Activity>>.Success(sortedActivities) ;
        }
    }

}