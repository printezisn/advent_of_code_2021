def fold_x(value, dots)
  dots.keys.each do |x, y|
    next if x < value

    diff = x - value
    dots[[value - diff, y]] = 1
    dots.delete([x, y])
  end
end

def fold_y(value, dots)
  dots.keys.each do |x, y|
    next if y < value

    diff = y - value
    dots[[x, value - diff]] = 1
    dots.delete([x, y])
  end
end

def fold(axis, value, dots)
  if axis == :x
    fold_x(value, dots)
  else
    fold_y(value, dots)
  end
end

dots = {}
folds = []

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  line = line.chomp
  next if line.empty?

  y_fold_match = line.match(/fold along y=(\d+)/)
  x_fold_match = line.match(/fold along x=(\d+)/)
  
  if y_fold_match
    folds << [:y, y_fold_match.to_a[1].to_i]
  elsif x_fold_match
    folds << [:x, x_fold_match.to_a[1].to_i]
  else
    new_dots = line.split(',').map(&:to_i)
    dots[new_dots] = 1
  end
end

fold(folds[0][0], folds[0][1], dots)

puts dots.size
