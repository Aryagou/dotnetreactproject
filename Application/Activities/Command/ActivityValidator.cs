using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Activities.Command
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(c => c.Title).NotEmpty();
            RuleFor(c => c.Category).NotEmpty();
            RuleFor(c => c.City).NotEmpty();
            RuleFor(c => c.Date).NotEmpty();
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.Venue).NotEmpty();
        }
    }
}