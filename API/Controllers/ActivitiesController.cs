using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.Queries;
using Application.Activities.Command;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new GetActivitiesQuery()));
        }

        [HttpGet("{id}")] //path: Activities/id
        public async Task<IActionResult> GetActivity(Guid id)
        {
            // [Handling API Error responses] [step 4]
            // Call the HandleResult method in base api controller and return the HTTP status to the client side
            return HandleResult(await Mediator.Send(new GetActivityDetailsQuery { Id = id }));
        }


        [HttpPost]
        public async Task<ActionResult> CreateActivity(Activity activity) // the attribute ApiController allows the Activity to be picked up from the request body, we can also explicity add [frombody]
        {
            return HandleResult(await Mediator.Send(new CreateActivityCommand { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateActivity(Guid id, Activity activity)
        {
            return HandleResult(await Mediator.Send(new UpdateActivityCommand { Id = id, Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivityCommand { Id = id }));
        }
    }
}