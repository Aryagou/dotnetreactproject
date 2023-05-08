using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Command
{
    public class UpdateActivityCommand : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
        public Activity Activity { get; set; }
    }

    public class UpdateActivityCommandHandler : IRequestHandler<UpdateActivityCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UpdateActivityCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public class CreateActivityCommandValidator : AbstractValidator<CreateActivityCommand>
        {
            public CreateActivityCommandValidator()
            {
                // SetValidator is a way to use one validator for multiple times
                // We can just validate against Activity directly
                // e.g. RuleFor(c => c.Title).NotEmpty();
                RuleFor(c => c.Activity).SetValidator(new ActivityValidator());
            }
        }


        public async Task<Result<Unit>> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);
            if (activity == null) return null;

            // activity.Title = request.Activity.Title ?? activity.Title;
            // We can just using the AutoMapper to save the typing above
            _mapper.Map(request.Activity, activity);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return Result<Unit>.Failure("Failed to update the activity");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
