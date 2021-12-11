def total_bags(bag, rules)
  rules[bag].sum { |contained_bag, total| total * total_bags(contained_bag, rules) } + 1
end

rules = {}

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  holding_bag, contained_bags = line.chomp.split('contain')

  holding_bag = holding_bag.match(/([a-z ]+) bags/).to_a[1]
  rules[holding_bag] = []

  unless contained_bags.include?('no other bags')
    contained_bags.split(',').each do |contained_bag|
      total, contained_bag = contained_bag.match(/(\d+) ([a-z ]+) bag/).to_a.drop(1)
      rules[holding_bag] << [contained_bag, total.to_i]
    end
  end
end

puts total_bags('shiny gold', rules) - 1
