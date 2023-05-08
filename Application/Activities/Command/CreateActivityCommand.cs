using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Command
{
    public class CreateActivityCommand : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; }
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

    public class CreateActivityCommandHandler : IRequestHandler<CreateActivityCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        public CreateActivityCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            // should really move those into DataContext itself as a function (see EndUploadCommand in AtoDataService)
            _context.Activities.Add(request.Activity);
            var result = await _context.SaveChangesAsync() > 0; // result is the entries that got written to db
            if (!result) return Result<Unit>.Failure("Failed to create activity");
            return Result<Unit>.Success(Unit.Value);
        }
    }


}