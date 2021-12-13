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

folds.each do |axis, value|
  fold(axis, value, dots)
end

max_x = dots.keys.map(&:first).max
max_y = dots.keys.map(&:last).max

(0..max_y).each do |y|
  (0..max_x).each do |x|
    if dots[[x, y]]
      print '# '
    else
      print '. '
    end
  end

  puts
end
